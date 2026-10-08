import { useState } from "react";

function Sorteio() {
    const [num, setNum] = useState<number | null>(null);
    const [historico, setHistorico] = useState<number[]>([]);
    const [saldo, setSaldo] = useState<number>(100);
    const [aposta, setAposta] = useState<number>(10);

    const numAleatorio = () => {
        const resultado = Math.floor(Math.random() * 6) + 1;
        setNum(resultado);
        const historicoAtualizado: number[] = [...historico, resultado];
        setHistorico(historicoAtualizado);
        const resultadoAposta = resultado === 6 ? (aposta * 5) + saldo : saldo - aposta;
        setSaldo(Math.max(resultadoAposta, 0));
    }

    const alterarAposta = (valor:number) => {
        const maisAposta = aposta + valor;
        setAposta(Math.max(Math.min(maisAposta, saldo), 5));
    }

    const text: string = num === null ? 'Clique abaixo para sortear!' : `Resultado é: ${num}`;
    return (
        <div>
            <p>{text}</p>
            <button onClick={numAleatorio} disabled = {saldo < aposta}>Sortear de 1 a 6</button>
            {historico.length > 0 ? <p>Histórico: <br/> {historico.join(', ')}</p> : null}
            <div>
                <p>Valor de saldo: {saldo}</p>
                <p>Valor de aposta: {aposta}</p>
                <div>
                    <button onClick = {() => alterarAposta(-5)}>-</button>
                    <button onClick = {() => alterarAposta(5)}>+</button>
                </div>
            </div>
        </div>
    );
}
export default Sorteio;