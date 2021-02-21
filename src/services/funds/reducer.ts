import { ExpenseModification, FundsAction, FundsState } from './types'
import { withValueAtIndex } from '../../utils/array'
import { Expense } from '../../types/Expense'

export const fundsReducer = (state: FundsState, action: FundsAction): FundsState =>
{
	switch (action.type)
	{
		case 'SET_INCOME': return setIncome(state, action.payload)
		case 'ADD_EXPENSE': return addExpense(state, action.payload)
		case 'MODIFY_EXPENSE': return modifyExpense(state, action.payload)
		case 'REMOVE_EXPENSE': return removeExpense(state, action.payload)
	}
}

const setIncome = (state: FundsState, income: number) => ({
	...state,
	income
})

const addExpense = (state: FundsState, { label, amount }: Expense) =>
	!doesExpenseWithLabelExist(state.expenses, label)
		? appendNewExpenseToState(state, label, amount)
		: state

const modifyExpense = (state: FundsState, { previousLabel, modifiedExpense }: ExpenseModification) =>
	doesExpenseWithLabelExist(state.expenses, previousLabel)
		? replaceExistingExpense(state, modifiedExpense, previousLabel)
		: state

const removeExpense = (state: FundsState, label: string) =>
	doesExpenseWithLabelExist(state.expenses, label)
		? removeExistingExpense(state, label)
		: state

const doesExpenseWithLabelExist = (expenses: Expense[], label: string): boolean =>
	indexOfExpense(expenses, label) !== -1

const indexOfExpense = (expenses: Expense[], label: string): number =>
	expenses.findIndex(e => e.label === label)

const appendNewExpenseToState = ({ expenses, ...state }: FundsState, label: string, amount: number) => ({
	...state,
	expenses: [...expenses, {
		label,
		amount
	}]
})

const replaceExistingExpense = (state: FundsState, modifiedExpense: Expense, previousLabel: string) => ({
	...state,
	expenses: withValueAtIndex(
		state.expenses,
		modifiedExpense,
		indexOfExpense(state.expenses, previousLabel)
	)
})

const removeExistingExpense = (state: FundsState, label: string) => ({
	...state,
	expenses: state.expenses.filter(e => e.label !== label)
})
