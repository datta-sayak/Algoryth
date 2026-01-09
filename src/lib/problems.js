export const problems = [
  {
    id: "p-1000",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["arrays", "hash-map"],
    statement:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.",
    constraints: [
      "2 ≤ nums.length ≤ 10^5",
      "-10^9 ≤ nums[i] ≤ 10^9",
      "-10^9 ≤ target ≤ 10^9",
      "Exactly one valid answer exists",
    ],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explaination: "We need to find two numbers in the array whose sum equals the target value 9.\nThe number at index 0 is 2. \nThe number at index 1 is 7. \n2 + 7 = 9, which matches the target. \nSo, we return their indices: [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explaination: "We need to find two numbers in the array whose sum equals the target value 6.\nThe number at index 1 is 2. \nThe number at index 2 is 4. \n2 + 4 = 6, which matches the target. \nSo, we return their indices: [1, 2]." },
    ],
  },
  {
    id: "p-1001",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["stack"],
    statement:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    constraints: ["1 ≤ s.length ≤ 10^5", "s consists of brackets only"],
    examples: [
      { input: "s = \"()\"", output: "true", explaination: "The string contains one opening bracket ( followed by one closing bracket ).\nSince every opening bracket is properly closed in the correct order, the parentheses are balanced.\nSo, the string is valid, and the output is true." },
      { input: "s = \"([)]\"", output: "false", explaination: "The string has the brackets (, [, ), and ].\nAlthough each type of bracket appears, they are not in the correct order.\nThe opening ( should be closed by ) before closing [.\nBut here, [ is opened and ) comes next, which breaks the proper nesting rule.\nBecause the brackets are not properly nested, the string is invalid, so the output is false." },
    ],
  },
  {
    id: "p-2000",
    slug: "max-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["dp", "arrays"],
    statement:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explaination: "We need to find a contiguous subarray with the maximum possible sum.\nIf we look at the array, the subarray:\n[4, -1, 2, 1] has the largest sum.\n4 + (-1) + 2 + 1 = 6\nSo, the maximum subarray sum is 6." }],
  },
];

export function getProblemBySlug(slug) {
  return problems.find((p) => p.slug === slug);
}
