export const deleteBoard = async (board) => {
  await board.destroy(); // Sequelize 인스턴스 삭제
};
