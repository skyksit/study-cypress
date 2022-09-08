describe("Nsmall 모바일 WEB", () => {
  context("팝업", () => {
    it("모바일 앱 설치 팝업", () => {
      //Given
      cy.wait(1000);
      //필요한 값 없음
      //When : NS 모바일 웹사이트 접속
      cy.visit("https://mw.nsmall.com/store/home");
      //Then : 모바일 앱 홍보 팝업 존재
      cy.get(".appgo_popup_section.active").should("have.length", 1);
    });
    it("모바일 앱 설치 팝업 닫기", () => {
      //Given
      //필요한 값 없음
      //When : 팝업 클로즈 버튼 클릭
      cy.get("div.close_button > button.icon_close").click();
      //Then : 팝업 영역이 사라짐
      cy.get(".appgo_popup_section").should("not.exist");
    });
    it("기획전 팝업", () => {
      //Given
      cy.wait(1000);
      //When : 모바일 앱 설치 팝업 닫기 후

      //Then : 기획전 팝업 존재
      cy.get(".exhibit_popup").should("have.length", 1);
    });
    it("기획전 팝업 닫기", () => {
      //Given
      //필요한 값 없음
      //When : 기획전 팝업 닫기 버튼 클릭
      cy.get(".exhibit_popup > button.btn_close").click();
      //Then : 기획전 팝업 영역이 사라짐
      cy.get(".exhibit_popup").should("not.exist", 1);
    });
  });
  context("하단 컨텐츠", () => {
    it("인기 검색어 10개 표시", () => {
      //Given 5초 대기
      cy.scrollTo("bottom");
      cy.wait(5000);
      //When : 인기검색어로 화면 scroll
      cy.get(".popular_search").scrollIntoView({
        easing: "linear",
        offset: { top: -100, left: 0 },
      });
      //Then : 인기검색어 10개 노출 (hidden 2개 포함 12개)
      cy.get(".popular_search").should("have.length", 1);
      cy.get(".swiper-slide > .word").should("have.length", 12);
    });
    it("추천상품 10개 이상 표시", () => {
      //Given : 1초 대기
      cy.wait(1000);
      cy.get("#today_3 > section > div:nth-child(4)").as("recommendProduct");
      //When : 추천상품 타이틀로 화면 scroll
      cy.get("@recommendProduct").scrollIntoView({
        easing: "linear",
        offset: { top: -100, left: 0 },
      });
      //Then : 추천상품 10개 이상 노출
      cy.get("@recommendProduct").within(() => {
        cy.get(".swiper-slide").should("have.length.gte", 10);
      });
    });
  });
});
