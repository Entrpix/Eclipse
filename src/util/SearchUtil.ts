export function searchUtil(input: string, template: string) {
  try {

      return new URL(input).toString();
  } catch (err) {
      // input was not a valid URL
  };

  try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
      // input was not valid URL
  };

  return template.replace("%s", encodeURIComponent(input));
};