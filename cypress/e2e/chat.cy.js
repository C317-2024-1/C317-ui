describe("Testes mensagens", () => {
    beforeEach(() => {
        cy.setCookie('c317-jwt', "1234", {
            path: '/',
            domain: "localhost",
            expiry: new Date(new Date().getTime() + (1000 * 60 * 60)).getTime()
        })
        cy.visit("http://localhost:5173/")

        const backendUrl = Cypress.env("backendUrl");

        cy.intercept("GET", backendUrl + "/api/user/", {
            statusCode: 200,
            body: {
                "id": 20,
                "name": "teste",
                "email": "teste@teste.com"
            }
        }).as("getUser")

        cy.intercept("GET", backendUrl + "/api/user/messages/", {
            statusCode: 200,
            body: [
                {
                    "message": "Teste usuário 1",
                    "date": "2024-05-29T13:33:47.866000",
                    "isUserMessage": true
                },
                {
                    "message": "Resposta IA 1",
                    "date": "2024-05-29T13:33:48.149000",
                    "isUserMessage": false
                },
                {
                    "message": "Teste usuário 2",
                    "date": "2024-05-29T13:33:49.972000",
                    "isUserMessage": true
                },
                {
                    "message": "Resposta IA 2",
                    "date": "2024-05-29T13:33:50.275000",
                    "isUserMessage": false
                }
            ]
        }).as("getMensagens")

        cy.intercept("POST", backendUrl + "/api/message/", {
            statusCode: 200,
            body: {
                "message": "Resposta IA 3",
                "date": "2024-05-29T13:34:50.275000",
                "isUserMessage": false
            }
        }).as("postMensagem")
    })

    it("Deveria mostrar as mensagens", () => {
        cy.wait("@getMensagens").its('response.statusCode').should('eq', 200);
        cy.get(".message").should("have.length", 4);
    })

    it("Deveria enviar uma mensagem", () => {
        cy.wait("@getMensagens").its('response.statusCode').should('eq', 200);
        
        cy.get("textarea").type("Teste");
        cy.get('button[data-tooltip-id="sendButton"]').click();
        
        cy.wait("@postMensagem").its('response.statusCode').should('eq', 200);
    })

    it("Mensagem enviada deveria ter texto certo", ()=>{
        cy.wait("@getMensagens").its('response.statusCode').should('eq', 200);
        cy.get("textarea").type("Teste");
        cy.get('button[data-tooltip-id="sendButton"]').click();
        
        cy.wait("@postMensagem").its('response.statusCode').should('eq', 200);
        
        cy.get(".message").should("have.length", 6);
        cy.get(".message").eq(4).should("have.text", "Teste");
        cy.get(".message").eq(5).should("have.text", "Resposta IA 3");
    })

    it("Mensagens deveriam estar ordenadas por horário", ()=>{
        const convertIsoToDate = (iso)=>{
            let parts = iso.split(/[/ ,:]/).filter(el=>el.length);
            
            let year = parseInt(parts[2]);
            let month = parseInt(parts[1]) - 1;
            let day = parseInt(parts[0]);
            let hours = parseInt(parts[3]);
            let minutes = parseInt(parts[4]);
            let seconds = parseInt(parts[5]);
            
           return new Date(year, month, day, hours, minutes, seconds);
        }

        cy.wait("@getMensagens").its('response.statusCode').should('eq', 200);

        cy.get(".time").then((elements) => {
            const messageTimes = Array.from(elements).map((element) => convertIsoToDate(element.innerText));
            const sortedTimes = [...messageTimes].sort();

            expect(messageTimes).to.deep.equal(sortedTimes);
        });
    })
})