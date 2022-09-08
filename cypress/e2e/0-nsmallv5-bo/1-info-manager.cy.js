beforeEach(() => {
  cy.viewport(1920, 1080);
});

describe("기준정보관리", () => {
  describe("전시영역등록관리", () => {
    before(() => {
      cy.visit("https://dev-bo.nsmall.com/");
      cy.viewport(1920, 1080);
      cy.get("[data-target='#firstTwoDepthWrap']").click();
      cy.get("[data-tab-label='전시 영역 등록 관리']").should("be.visible");
      cy.get("[data-tab-label='전시 영역 등록 관리']").click();
    });

    it("등록", () => {
      //Given : 입력할 정보
      //display_id, display_name
      //When : 데이터 입력 후 등록 버튼 클릭
      cy.get("input#display_id").type("20220902");
      cy.get("input#display_name").type("홈매장추천상품배너영역");
      //Then : 등록 완료 메시지 확인
      cy.get(
        "#area-mng > div > div.d-flex.justify-content-center.my-5 > button.btn.btn-primary.btn-lg.mx-1"
      ).click();
    });
    it("수정", () => {
      //Given : 수정할 정보
    });
    it("삭제", () => {
      //Given : 삭제할 정보
    });
  });
});
