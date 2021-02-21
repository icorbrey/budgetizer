import { FundsProvider } from '../services/funds'

export default ({ children }: { children: React.ReactNode }) => (
	<FundsProvider>
		{ children }
	</FundsProvider>
)
