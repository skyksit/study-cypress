/* 시나리오: 로그인 로직(임직원인지 아닌지) -> 상품 번호 입력 후 -> 주문 결제 페이지 이동 (1.여러가지 선택할 수있는 경우, 2.상담 상품인 경우, 3. 수량을 선택할 수 있는 경우)

예상 결과:

1. 할인이 선택되고 결제금액 적용 -> 쿠폰 선택시 임직원 할인이 취소되고 결제금액 변경 확인

2. 무료배송 적용 / 임직원할인 + 배송비 할인 정상 적용
3. 1 + 2

*/

describe("쿠폰 테스트", () => {
  before(() => {
    cy.visit("https://mw.nsmall.com/store/home");

    // 모바일 웹에서 쇼핑하기 찾으면 해당 글씨 클릭
    cy.get(".web_go > a").should("have.text", "모바일 웹에서 쇼핑하기").click();
    cy.exist(".exhibit_popup > .btn_close").then((exist) => {
      if (exist) {
        cy.get(exist).click();
      }
    });
    // cy.get('.exhibit_popup > .btn_close').should('be.visible').click()

    cy.visit("https://mw.nsmall.com/customer/login/regular-member").then(
      (s) => {
        cy.get(".input_group")
          .get("input")
          .should("be.visible")
          .as("input")
          .eq(0)
          .type("아이디입력", { log: false })
          .log("아이디 입력");
        // 패스워드 입력
        cy.get("@input")
          .should("be.visible")
          .eq(1)
          .type("비밀번호입력", { force: true, log: false })
          .log("비밀번호 입력");
        // 로그인 버튼 클릭
        cy.get("#btnLogin").should("be.visible").click();
      }
    );
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  // after(() => {
  //   Cypress.LocalStorage.clear()
  // })

  // beforeEach(() => {
  //   cy.session('mySession', () => {
  //     cy.visit('https://mw.nsmall.com/customer/login/regular-member', {
  //       onBeforeLoad: window => {
  //         cy.login(username, password) // sets a cookie
  //       }
  //     })
  //   })
  // })

  // it('홈페이지 접속 및 팝업 닫기', () => {
  //   cy.visit('https://mw.nsmall.com/store/home')

  //   // 모바일 웹에서 쇼핑하기 찾으면 해당 글씨 클릭
  //   cy.get('.web_go > a').should('have.text', '모바일 웹에서 쇼핑하기').click()
  //   cy.get('.exhibit_popup > .btn_close').should('be.visible').click()
  // })

  it("상품 번호 검색", () => {
    // 검색창 클릭
    cy.get(".search_input").should("be.visible").click();

    // 상품 번호 입력
    // 31887932 : 선택 상품
    // 30851735 : 갯수 상품
    cy.get("#label_search").should("be.visible").type("30851735");
    cy.get(".right_wrap > .search_input").should("be.visible").click();
  });

  it("상세 페이지 이동 및 상품 옵션 선택", () => {
    // if (Cypress.$('.web_go > a').length > 0) {
    //   // 모바일 웹에서 쇼핑하기 찾으면 해당 글씨 클릭
    //   cy.get('.web_go > a').should('have.text', '모바일 웹에서 쇼핑하기').click()

    //   // 팝업 뜨는 것 닫기. force: true를 안하면 안닫힘
    //   cy.get('.exhibit_popup > .btn_close').click().wait(1500)
    // }

    // 검색된 상품 리스트 중에서 클릭(상품 상세 진입)
    // cy.get('.product_info > figure').click()

    // 1. 구매하기 클릭(수량 상품일 때)
    // cy.get('.button_buy').click()

    // 구매하기 클릭
    // cy.get('.btn_buy').click()

    // 2. 상품 목록 선택 일 때
    // cy.get('.button_buy').click().wait(1500)
    // cy.get('.btn_select').click().wait(1500)
    // cy.get('.select_list').children().eq(0).click().wait(1500)
    // cy.get('.btn_buy').click().wait(1500)

    cy.get(".product_info > figure").should("be.visible").click();
    // 구매하기 클릭, 수량이나 선택상품 모두 같음
    cy.get(".button_buy").should("be.visible").click();
    // 수량 상품이 아닌 경우
    cy.exist(".plus").then((exists) => {
      // 플러스 버튼이 존재할 경우 exists를 반환하고,
      // exists가 true가 아닌 false를 반환하면 (없다면)
      if (exists) {
        cy.get(".btn_buy").should("be.visible").click();
      } else {
        cy.get(".btn_select").should("be.visible").click();
        cy.get(".select_list").should("be.visible").children().eq(0).click();
        cy.get(".btn_buy").should("be.visible").click();
      }
    });

    // 구매하기 눌러 주문/결제창으로 이동
    // cy.get('.btn_buy').click()

    // 3. 선택 목록이 2가지일 때
    // cy.get('.button_buy').click()
    // cy.get('.selected > .btn_select').click()
    // cy.get('.select_list').children().eq(0).click()
    // cy.wait(1500)
    // cy.get('.btn_select').children().eq(1).click().wait(2000)
    // cy.get('.selected > .select_list').children().eq(0).click().wait(1500)
    // cy.get('.btn_buy').click()

    // 로그인 로직
    // const username = 'jun-1004@naver.com'
    // const password = '!1004jkp'
    // cy.session([username, password], () => {
    //   cy.get('.input_group').get('input').should('be.visible').as('input').eq(0).type(username, { log: false }).log('아이디 입력')
    //   // 패스워드 입력
    //   cy.get('@input').should('be.visible').eq(1).type(password, { force: true, log: false }).log('비밀번호 입력')
    //   // 로그인 버튼 클릭
    //   cy.get('#btnLogin').should('be.visible').click()
    // })

    // 4. 상담 상품 일 때
    // cy.get('.button_buy').click().wait(1500)
    // cy.get('.button_buy').click()
  });

  it("임직원 혜택 정상인지 확인", () => {
    const price = cy.get("strong.price_current");
    let original_price;
    let employee_price;
    price.each((e) => {
      original_price = parseInt(e.text().replace(",", "").replace("원", ""));
      cy.get(".total > dd > strong").then((txt) => {
        employee_price = parseInt(txt.text().replace(",", ""));

        if (original_price * parseFloat(0.8) == parseFloat(employee_price)) {
          cy.log("임직원 가격 정상");
          cy.log(`오리지널 가격 * 0.8 = ${original_price * 0.8}`);
          cy.log(`임직원 가격 = ${employee_price}`);
        } else {
          cy.log("임직원 가격 오류");
          cy.log(`오리지널 가격 * 0.8 = ${original_price * 0.8}`);
          cy.log(`임직원 가격 = ${employee_price}`);
        }
      });
    });
  });

  it("어떤 할인도 적용하지 않았을 때", () => {
    cy.get("#checkedEmployee").should("be.visible").uncheck();
    // 쿠폰 클릭
    // cy.get('label.select').click()
    cy.get(":nth-child(9) > div > .coral_border > span")
      .should("be.visible")
      .click();
    // cy.get('label.select').select('추가할인 적용 안함')
    cy.get("label.select > select").eq(2).select(0);

    let original;
    cy.get(".price_current").then((original) => {
      original = original.text().replace(",", "").replace("원", "");
      cy.get(".total > dd > strong").then((txt) => {
        if (parseInt(original) == parseInt(txt.text().replace(",", ""))) {
          cy.log("어떠한 할인도 적용되지 않음(정상)");
        } else {
          cy.log("할인 반영 중(오류)");
        }
      });
    });
  });

  it("어떤 할인율의 쿠폰을 사용했는지 확인", () => {
    // 임직원 할인 해재하고 할인 쿠폰 선택
    cy.get("#checkedCoupons").should("be.visible").check();

    // 할인 쿠폰 바로 방문 할인 3퍼센트 사용하기
    // cy.get('label.select > select').eq(2).select(1)
    cy.get("label.select > select")
      .eq(2)
      .find("option")
      .each((sel) => {
        // 쿠폰 출력
        // cy.log(`쿠폰 출력: ${sel.text()}`)
        // includes 안의 내용만 수정하여 할인율 변경 가능
        if (sel.text().includes("안함")) {
          cy.get("label.select > select").eq(2).select(sel.text().trim());
        }
      });

    // 사용한 쿠폰 계산하기
    let original;
    cy.get(".price_current").then((orig) => {
      original = orig.text().replace(",", "").replace("원", "");
      cy.get(".total > dd > strong").then((txt) => {
        const percent = Math.floor(
          ((parseInt(original) - parseInt(txt.text().replace(",", ""))) /
            original) *
            100
        );
        if (percent == 0) {
          cy.log("쿠폰을 사용하지 않았습니다.");
        } else {
          cy.log(`사용한 쿠폰은: ${percent}% 할인 쿠폰 입니다.`);
        }
      });
    });
  });
});
