export const useFormatPreSignedUrl = (preSignedUrl: string) => {
  return preSignedUrl.split('?')[0]
}
