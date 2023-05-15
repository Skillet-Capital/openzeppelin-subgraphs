import {
	BigInt,
	Address,
} from '@graphprotocol/graph-ts'

import {
	ERC721Transfer,
} from '../../generated/schema'

import {
	Transfer       as TransferEvent,
} from '../../generated/erc721/IERC721'

import {
	events,
	transactions,
} from '@amxx/graphprotocol-utils'

import {
	fetchAccount,
} from '../fetch/account'

import {
	fetchERC721,
	fetchERC721Token,
  fetchERC721Balance
} from '../fetch/erc721'

export function handleTransfer(event: TransferEvent): void {
	let contract = fetchERC721(event.address)
	if (contract != null) {
		let token         = fetchERC721Token(contract, event.params.tokenId)
		let from          = fetchAccount(event.params.from)
		let to            = fetchAccount(event.params.to);

    let toBalance     = fetchERC721Balance(contract, to.id)
    toBalance.balance = toBalance.balance.plus(BigInt.fromI32(1))
    toBalance.save()

    // do not change balance on mint
    if (!from.id.equals(Address.zero())) {
      let fromBalance = fetchERC721Balance(contract, from.id)
      fromBalance.balance = fromBalance.balance.minus(BigInt.fromI32(1))
      fromBalance.save()
    }

		token.owner    = to.id
		token.approval = fetchAccount(Address.zero()).id // implicit approval reset on transfer

		contract.save()
		token.save()

		let ev         = new ERC721Transfer(events.id(event))
		ev.emitter     = contract.id
		ev.transaction = transactions.log(event).id
		ev.timestamp   = event.block.timestamp
		ev.contract    = contract.id
		ev.token       = token.id
		ev.from        = from.id
		ev.to          = to.id
		ev.save()
	}
}
