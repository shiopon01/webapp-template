import * as express from "express";

/**
 * GET /echo
 * Return a string same as "say" query param.
 */
export function echoApi(req: express.Request, res: express.Response): void {
  const query: { say: string } = <{ say: string }>req.query;
  if (query.say !== undefined) {
    res.send(echo(query.say));
  } else {
    res.status(400).send('"say" query param is required');
  }
}

/**
 * return a string same as input
 * @param say input (= output)
 */
export function echo(say: string): string {
  return say;
}
