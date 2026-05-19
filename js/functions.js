function onCheckString(string, maxLength) {
  return string.length <= maxLength;
}

function onCheckPalindrome(str) {
  const normalized = str.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < normalized.length / 2; i++) {
    if (normalized[i] !== normalized[normalized.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
