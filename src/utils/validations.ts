export function isValidObjectId(id: any): boolean {
  return /^[a-f\d]{24}$/i.test(id);
}
