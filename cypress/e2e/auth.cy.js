describe("Testes auth", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:5173/")
        const backendUrl = Cypress.env("backendUrl");
        cy.intercept("POST", backendUrl+"/api/register", {
            statusCode: 200,
            body: {
                "id": 20,
                "name": "teste",
                "email": "teste@teste.com"
            }
        }).as("cadastrar")

        cy.intercept("POST", backendUrl+"/api/login", {
            statusCode: 200,
            body: {
                "c317-jwt": "1234",
            }
        }).as("logar")

        cy.intercept("GET", backendUrl+"/api/messages", {
            statusCode: 200,
            body: []
        }).as("getMensagens")
    })

    it("Deveria redirecionar para tela de autentiação", ()=>{
        cy.url().should("include", "/auth");
    })
    
    it("Deveria mostrar os campos corretos para login", ()=>{
        cy.get("input[placeholder='Preencha seu email...']").should("exist");
        cy.get("input[placeholder='Preencha sua senha...']").should("exist");
        cy.get("button[type=submit]").should("exist").should("have.text", "Entrar");
    })

    it("Botao deveria alternar entre login e cadastro", ()=>{
        cy.get("button[type=submit]").should("exist").should("have.text", "Entrar");
        cy.contains("button", "Criar nova conta").click();
        cy.get("button[type=submit]").should("exist").should("have.text", "Cadastre-se");
        cy.contains("button", "Entrar com conta existente").click();
        cy.get("button[type=submit]").should("exist").should("have.text", "Entrar");
    })

    it("Deveria mostrar os campos corretos para cadastro", ()=>{
        cy.contains("button", "Criar nova conta").click();

        cy.get("input[placeholder='Preencha seu nome...']").should("exist");
        cy.get("input[placeholder='Preencha seu email...']").should("exist");
        cy.get("input[placeholder='Preencha sua senha...']").should("exist");
        cy.get("button[type=submit]").should("exist").should("have.text", "Cadastre-se");
    })

    it("Deveria realizar o cadastro com sucesso", () => {
        cy.contains("button", "Criar nova conta").click();
    
        cy.get("input[placeholder='Preencha seu nome...']").type("teste");
        cy.get("input[placeholder='Preencha seu email...']").type("teste@teste.com");
        cy.get("input[placeholder='Preencha sua senha...']").type("1234");
        cy.get("button[type=submit]").click();

        cy.wait('@cadastrar').its('response.statusCode').should('eq', 200);

        cy.url().should('include', '/');
    });
    
    it("Deveria realizar o login com sucesso", () => {
        cy.get("input[placeholder='Preencha seu email...']").type("teste@teste.com");
        cy.get("input[placeholder='Preencha sua senha...']").type("1234");
        cy.get("button[type=submit]").click();
        
        cy.wait('@logar').its('response.statusCode').should('eq', 200);

        cy.url().should('include', '/');
      });
})