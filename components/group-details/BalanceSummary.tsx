type Balance = {
    from: string;
    to: string;
    amount: number;
  };
  
  type BalanceSummaryProps = {
    balances: Balance[];
  };
  
  export default function BalanceSummary({
    balances,
  }: BalanceSummaryProps) {
    return (
      <section aria-labelledby="balance-title">
        <h2 id="balance-title">Balances</h2>
  
        {balances.length === 0 ? (
          <p>Everyone is settled up.</p>
        ) : (
          <ul>
            {balances.map((balance, index) => (
              <li key={`${balance.from}-${balance.to}-${index}`}>
                <strong>{balance.from}</strong> owes{" "}
                <strong>{balance.to}</strong>{" "}
                {balance.amount.toFixed(2)} kr
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }