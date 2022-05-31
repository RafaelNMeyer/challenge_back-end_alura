class ExpenditureError extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'ExpenditureError';
      this.status=status
    }
  }
  
  export default ExpenditureError;