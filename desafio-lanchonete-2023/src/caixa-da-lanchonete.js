class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if (itens.length === 0) {
            return `Não há itens no carrinho de compra!`;
        }

        if (!['dinheiro', 'debito', 'credito'].includes(metodoDePagamento)) {
            return `Forma de pagamento inválida!`;
        }

        let valorTotal = 0;
        let possuiItemPrincipal  = false;
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (Number(quantidade) === 0 || !quantidade) {
                return `Quantidade inválida!`
            }

            if (!(codigo in this.cardapio)) {
                return `Item inválido!`;
            }

            if (codigo !== 'chantily' && codigo !== 'queijo') {
                possuiItemPrincipal = true;
            }

            valorTotal += this.cardapio[codigo].valor * Number(quantidade);
        }

        if (!possuiItemPrincipal) {
            return `Item extra não pode ser pedido sem o principal`;
        }
   
        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

const caixa = new CaixaDaLanchonete();
// console.log(caixa.calcularValorDaCompra('debito', ['cafe,1', 'chantily,1']));
// console.log(caixa.calcularValorDaCompra('credito', ['combo1,1','cafe,2']));
console.log(caixa.calcularValorDaCompra('debito', ['chantily,1']));
// console.log(caixa.calcularValorDaCompra('debito', ['1']));
// console.log(caixa.calcularValorDaCompra('dinheiro', ['chantily,1']));
// console.log(caixa.calcularValorDaCompra('credito', ['chantily,1', 'sanduiche,1']));
// console.log(caixa.calcularValorDaCompra('debito', ['chantily,0']));
// console.log(caixa.calcularValorDaCompra('debito', ['cafe,1', 'queijo,1']));

export { CaixaDaLanchonete };
