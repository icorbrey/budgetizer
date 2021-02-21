import { FundsAction, FundsState } from './types'
import { fundsReducer } from './reducer'

describe('The Funds reducer', () =>
{
	const testExpense1 = {
		label: 'Test Expense 1',
		amount: 1111,
	}

	const testExpense2 = {
		label: 'Test Expense 2',
		amount: 2222,
	}

	const testExpense3 = {
		label: 'Test Expense 3',
		amount: 3333,
	}

	const testExpense4 = {
		label: 'Test Expense 4',
		amount: 4444,
	}

	const testExpenses = [
		testExpense1,
		testExpense2,
		testExpense3,
	]

	const state: FundsState = {
		income: 1234,
		expenses: testExpenses,
	}

	it('sets income to the given amount', () =>
	{

		const action: FundsAction = {
			type: 'SET_INCOME',
			payload: 4321,
		}

		expect(fundsReducer(state, action)).toStrictEqual({
			income: 4321,
			expenses: testExpenses,
		})
	})

	describe('when adding an expense', () =>
	{
		it('adds an expense with a unique name', () =>
		{
			const action: FundsAction = {
				type: 'ADD_EXPENSE',
				payload: testExpense4,
			}

			expect(fundsReducer(state, action)).toStrictEqual({
				...state,
				expenses: [
					...testExpenses,
					testExpense4,
				]
			})
		})

		it('does not add an expense with an existing name', () =>
		{
			const action: FundsAction = {
				type: 'ADD_EXPENSE',
				payload: testExpense1
			}

			expect(fundsReducer(state, action)).toStrictEqual(state)
		})
	})

	describe('when modifying an expense', () =>
	{
		it('modifies existing expenses', () =>
		{
			const action: FundsAction = {
				type: 'MODIFY_EXPENSE',
				payload: {
					previousLabel: 'Test Expense 1',
					modifiedExpense: testExpense4,
				}
			}

			expect(fundsReducer(state, action)).toStrictEqual({
				...state,
				expenses: [
					testExpense4,
					testExpense2,
					testExpense3,
				]
			})
		})

		it('does not modify a nonexistent expense', () =>
		{
			const action: FundsAction = {
				type: 'MODIFY_EXPENSE',
				payload: {
					previousLabel: 'Test Expense 4',
					modifiedExpense: testExpense1,
				}
			}

			expect(fundsReducer(state, action)).toStrictEqual(state)
		})
	})

	describe('when removing an expense', () =>
	{
		it('removes an existing expense', () =>
		{
			const action: FundsAction = {
				type: 'REMOVE_EXPENSE',
				payload: 'Test Expense 1',
			}

			expect(fundsReducer(state, action)).toStrictEqual({
				...state,
				expenses: testExpenses.slice(1)
			})
		})

		it('does not remove a nonexistent expense', () =>
		{
			const action: FundsAction = {
				type: 'REMOVE_EXPENSE',
				payload: 'Test Expense 4'
			}

			expect(fundsReducer(state, action)).toStrictEqual(state)
		})
	})
})
