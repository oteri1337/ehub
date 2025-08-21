function userReducer(state = false, action) {
	switch (action.dispatch) {
		case "UPDATE_USER":
			return action.data;
		case "UPDATE_USER_DATA_PAGE":
			return {
				...state,
				contracts: {
					...action.data.contracts,
					data: [...state.contracts.data, ...action.data.contracts.data]
				},
				deposits: {
					...action.data.deposits,
					data: [...state.deposits.data, ...action.data.deposits.data]
				},
				referrals: {
					...action.data.referrals,
					data: [...state.referrals.data, ...action.data.referrals.data]
				},
				trades: {
					...action.data.trades,
					data: [...state.trades.data, ...action.data.trades.data]
				},
				withdrawals: {
					...action.data.withdrawals,
					data: [...state.withdrawals.data, ...action.data.withdrawals.data]
				}
			};
		default:
			return state;
	}
}

export default userReducer;
