const ConfigLocal = baseUrl => {
  return {
    settings: {
      endpoint: `${baseUrl}/<PRODUCTION ENDPOINT GOES HERE>`,
    },
  }
}

export default ConfigLocal
