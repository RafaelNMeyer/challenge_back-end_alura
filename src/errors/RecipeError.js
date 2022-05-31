class RecipeError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'RecipeError';
    this.status=status
  }
}

export default RecipeError;