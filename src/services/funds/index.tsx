import { useReducer } from 'react'
import createStatefulContext from 'react-context-stateful'
import { Expense } from '../../types/Expense'
import { fundsReducer } from './reducer'

type FundsValue = {
	income: number
	expenses: Expense[]
	setIncome: (amount: number) => void
	addExpense: (expense: Expense) => void
	modifyExpense: (label: string, expense: Expense) => void
	removeExpense: (label: string) => void
}

export const [
	useFunds,
	FundsProvider,
] = createStatefulContext<FundsValue>(Provider => ({ children }) => (
	<Provider value={ useFundsHook() }>
		{ children }
	</Provider>
))

export const useFundsHook = () =>
{
	const [{ income, expenses }, dispatch] = useReducer(fundsReducer, {
		income: 0,
		expenses: []
	})

	const setIncome = (income: number) => dispatch({
		type: 'SET_INCOME',
		payload: income,
	})

	const addExpense = (expense: Expense) => dispatch({
		type: 'ADD_EXPENSE',
		payload: expense,
	})

	const modifyExpense = (label: string, expense: Expense) => dispatch({
		type: 'MODIFY_EXPENSE',
		payload: {
			previousLabel: label,
			modifiedExpense: expense,
		},
	})

	const removeExpense = (label: string) => dispatch({
		type: 'REMOVE_EXPENSE',
		payload: label,
	})

	return {
		income,
		expenses,
		setIncome,
		addExpense,
		modifyExpense,
		removeExpense,
	}
}
