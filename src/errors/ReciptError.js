class ReciptError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ReciptError';
    this.status=status
  }
}

export default ReciptError;