export async function POST(request) {
  const { language, code, input, inputType } = await request.json();
  // Mock execution and simple visualization derivation from input
  let visualization = null;

  try {
    if (inputType === "array" && Array.isArray(input)) {
      visualization = { type: "array", data: [...input] };
    } else if (
      inputType === "matrix" &&
      Array.isArray(input) &&
      Array.isArray(input[0])
    ) {
      visualization = { type: "matrix", data: input };
    } else if (
      inputType === "graph" &&
      input &&
      Array.isArray(input.nodes) &&
      Array.isArray(input.edges)
    ) {
      visualization = { type: "graph", data: input };
    } else if (typeof input === "string") {
      // try to parse generic JSON
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) {
          if (Array.isArray(parsed[0])) visualization = { type: "matrix", data: parsed };
          else visualization = { type: "array", data: parsed };
        } else if (parsed && typeof parsed === "object") {
          if (Array.isArray(parsed.nodes) && Array.isArray(parsed.edges))
            visualization = { type: "graph", data: parsed };
          else visualization = { type: "json", data: parsed };
        }
      } catch {
        // leave as null
      }
    }
  } catch {
    visualization = null;
  }

  const result = {
    status: "Accepted",
    output: `Executed ${language} code successfully. Code length: ${code?.length || 0}`,
    language,
    visualization,
  };
  return Response.json(result);
}