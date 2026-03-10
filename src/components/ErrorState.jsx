function ErrorState({ message, onRetry }) {
  return (
    <div>
      <p>Error: {message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}

export default ErrorState;
