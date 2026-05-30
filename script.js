// VALIDAR CPF
const isCpfValid = (cpf) => {
    const cpfValidator = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/.test(cpf);
    const cpfLimpo = cpf.replace(/[^\d]/g, '').trim();

    if (cpfValidator) {
        // Digito 1:
        let total = 0;
        for (let i = 0; i < 9; i++) {
            total += parseInt(cpfLimpo.charAt(i) * (10 - i));
        }
        let digito1 = (total * 10) % 11;
        digito1 == 10 ? (digito1 = 0) : digito1;

        total = 0;
        // Digito 2:
        for (let i = 0; i < 10; i++) {
            total += parseInt(cpfLimpo.charAt(i) * (11 - i));
        }
        let digito2 = (total * 10) % 11;
        digito2 == 10 ? (digito2 = 0) : digito2;

        // Validação:
        if (digito1 == cpfLimpo.charAt(9) && digito2 == cpfLimpo.charAt(10)) {
            // Valido
            return true;
        } else {
            // Invalido
            return false;
        }
    } else {
        // Invalido
        return false;
    }
};

document.querySelector('h1').addEventListener('click', () => {
    location.href = '.';
});

document.getElementById('cpf-verify').addEventListener('click', () => {
    let cpf = document.getElementById('cpf').value;
    let cpfValid = isCpfValid(cpf);
    let texto = document.getElementById('texto');
    let alerta = document.getElementById('main-footer');
    if (cpf) {
        texto.style.fontWeight = '800';
        texto.style.width = 'clamp(180px, 100vw , 450px)';

        alerta.style.width = 'clamp(180px, 100vw , 450px)';
        alerta.innerHTML =
            '<p>Para verificações mais precisas acesse o site da <a href="https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp" target="_blank">Receita Federal</a>.</p>';

        let link = alerta.querySelector('a');
        link.style.color = '#333';

        link.addEventListener(
            'mouseenter',
            () => (link.style.color = '#de6262'),
        );
        link.addEventListener('mouseleave', () => (link.style.color = '#333'));

        if (cpfValid) {
            texto.style.color = '#0ca04a';
            texto.innerText = 'CPF  VÁLIDO!';
        } else {
            texto.style.color = '#de6262';
            texto.innerText = 'CPF INVÁLIDO!';
        }
    }
});
