import { Expense } from '../../types/Expense'

export type FundsState = {
	income: number
	expenses: Expense[]
}

export type FundsAction =
	SetIncomeAction
	| AddExpenseAction
	| ModifyExpenseAction
	| RemoveExpenseAction

export type ExpenseModification = {
	previousLabel: string
	modifiedExpense: Expense
}

type SetIncomeAction = {
	type: 'SET_INCOME'
	payload: number
}

type AddExpenseAction = {
	type: 'ADD_EXPENSE'
	payload: Expense
}

type ModifyExpenseAction = {
	type: 'MODIFY_EXPENSE'
	payload: ExpenseModification
}

type RemoveExpenseAction = {
	type: 'REMOVE_EXPENSE'
	payload: string
}
