export const generateNewKey = (currentKey) => {
    // '_' 기준으로 분리
    if (!currentKey) {
        currentKey = 'ds_00000000';
    }
    const [prefix, numberPart] = currentKey.split('_');
    
    // 숫자 부분을 int로 변환하고 1 증가시킴
    let newNumber = parseInt(numberPart, 10) + 1;
    
    // 숫자를 다시 8자리 문자열로 변환 (앞에 0을 추가)
    newNumber = newNumber.toString().padStart(8, '0');
    
    // 새로운 key 값 생성
    const newKey = `${prefix}_${newNumber}`;
    
    return newKey;
};