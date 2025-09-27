<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link rel="stylesheet" href="_css/style_pageCadastro.css">
</head>

<body>
    <ul>
        <li class="inicio"><a href="index.html">Inicio</a></li>
        <li class="galeria"><a href="page_galeria.html">Galeria</a></li>
        <li class="agenda"><a href="page_eventos.html">Agenda</a></li>

        <li>
            <h1>Cadastro</h1>
        </li>
        <img class="img-logo" src="_imagens/logo.png" alt="logo-app">
    </ul>

    <form method="post">
        <fieldset>
            <div class="area1">
                <label>NOME:</label>
                <br>
                <input type="text" name="nome" id="nome" required>
                <p></p>
                <label>EMAIL:</label>
                <br>
                <input type="email" name="email" id="email" required>
                <p></p>
                <label>TELEFONE:</label>
                <br>
                <input type="number" name="telefone" id="telefone" required>
                <p></p>
                <label>IDADE:</label>
                <br>
                <input type="number" name="idade" id="idade" required>
                <p></p>
                <label>TURMA:</label>
                <br>
                <input type="text" name="turma" id="turma" required>
                <p></p>
            </div>

            <div class="area2">
                <label>ESPORTE FAVORITO:</label>
                <br>
                <input type="text" name="esporte" id="esporte" required>
                <p></p>
                <label>DESEJA RECEBER NOVIDADES?</label>
                <br>

                <label>Sim</label>
                <input type="radio" name="escolha" id="sim" value="sim">
                <label>Não</label>
                <input type="radio" name="escolha" id="nao" value="nao">

                <br><br>
                <div class="botao">
                    <button type="submit" id="btn" onclick="aviso()">CADASTRAR</button>
                    <br><br>
                    <input type="button" onclick="json()" value="Gerar JSON" id="btn">
                </div>
            </div>
        </fieldset>
    </form>

    <!-- Modal para exibir o JSON -->
    <div id="jsonModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>BANCO DE DADOS JSON</h2>
            <div id="jsonContent" class="json-display"></div>
        </div>
    </div>
    
    <?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $nome_cadas = $_POST["nome"];
    $email_cadas = $_POST["email"];
    $telefo_cadas = $_POST["telefone"];
    $idade_cadas = $_POST["idade"];
    $turma_cadas = $_POST["turma"];
    $esporte_cadas = $_POST["esporte"];
    $notificacao_cadas = $_POST["escolha"];

    $servername = "localhost";
    $database = "gremio_colorado";
    $username = "root";
    $password = "";

    $conn = mysqli_connect($servername, $username, $password, $database);
    if (!$conn) {
        die("falha na conexão: " . mysqli_connect_error());
    }

    echo "";

    $sql = "INSERT INTO cadastro(
            nome_cadas,
            email_cadas,
            telefe_cadas,
            idade_cadas,
            turma_cadas,
            esporte_cadas,
            notificacao_cadas
            ) VALUE (
            '$nome_cadas',
            '$email_cadas',
            '$telefo_cadas',
            '$idade_cadas',
            '$turma_cadas',
            '$esporte_cadas',
            '$notificacao_cadas'
            )";

   if (mysqli_query($conn, $sql)) {
    echo "<br>";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
 }
?>
    
    <script src="_javascript/JavaScript_Cada.js"></script>
</body>

</html>
