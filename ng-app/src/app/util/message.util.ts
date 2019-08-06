function getErrorMessage(error: any) {
  try {
    return error.networkError.error.errors.map(e => e.message).join('/n');
  } catch {
    try {
      return error.graphQLErrors.map(e => e.message).join('/n');
    } catch {}
  }
  return 'An unexpected error occurred';
}

export { getErrorMessage };
