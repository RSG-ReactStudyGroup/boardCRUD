export const updateBoard = async (board, data) => {
  const { title, content } = data;

  //  JavaScript의 **nullish 병합 연산자(??)**를 사용해서
  // "요청에서 값이 오면 수정하고, 없으면 기존 값 그대로 둬" 라는 의도를 표현
  board.title = title ?? board.title;
  board.content = content ?? board.content;
  board.updated_at = new Date();

  await board.save();

  return board;
};
