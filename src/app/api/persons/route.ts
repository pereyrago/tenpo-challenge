import { AxiosError } from "axios";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
  const SEED = process.env.REQUEST_SEED || "abc";
  const page = params.get("page") || "1";
  const perPage = "2000";
  const inc = [
    "gender",
    "name",
    "location",
    "email",
    "phone",
    "cell",
    "picture",
  ];

  try {
    const apiUrl = `${EXTERNAL_API_URL}api/?page=${page}&results=${perPage}&seed=${SEED}&inc=${inc.join(
      ","
    )}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch persons" }),
        {
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return new Response(JSON.stringify({ error: "server error" }), {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
