import React from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();

  let [...txnHistory] = transactionHistory();

  txnHistory = txnHistory.slice(0, 4);

  return (
    <HistoryStyled>
      <h2>Recent Transactions</h2>
      {txnHistory.map((historyItem, idx) => {
        return (
          <div className="history-item" key={idx}>
            <p
              style={{
                color: historyItem.type === "expense" ? "red" : "green",
              }}
            >
              {historyItem.name}
            </p>

            <p
              style={{
                color: historyItem.type === "expense" ? "red" : "green",
              }}
            >
              {historyItem.type === "expense"
                ? `-${historyItem.amount}`
                : `+${historyItem.amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
