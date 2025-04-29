export interface CodeSnippet {
  id: number;
  code: string;
  bug: string;
  fixedCode: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: 1,
    language: 'JavaScript',
    difficulty: 'easy',
    code: `function calculateSum(arr) {
  let sum = 0;
  for(let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
    bug: 'Array index out of bounds',
    fixedCode: `function calculateSum(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`
  },
  // ... copying all 50 snippets here ...
  {
    id: 50,
    language: 'Python',
    difficulty: 'hard',
    code: `def merge_lists(list1, list2):
    return list1 + list2

print(merge_lists([1, 2], [3, 4]))`,
    bug: 'No validation for empty input lists',
    fixedCode: `def merge_lists(list1, list2):
    if not list1 or not list2:
        raise ValueError("Both lists must contain elements")
    return list1 + list2

print(merge_lists([1, 2], [3, 4]))`
  }
]; 