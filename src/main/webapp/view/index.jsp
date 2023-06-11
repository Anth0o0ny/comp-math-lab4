<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>comp-math#4</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma-rtl.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<style>
    body {
        background-color: lightgoldenrodyellow;
    }
</style>

<body>

<section class="section">

    <div class="columns">

        <div id="graphicFrame" class="column is-half">
            <canvas id="graphic"></canvas>
        </div>

        <div id="data" class="column is-half">
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <label class="label">Select:</label>
                            <div class="select is-fullwidth">
                                <select id="rowCountSelect">
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table id="myTable" class="table is-hoverable is-bordered">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                <tr>
                    <td><input class="input is-small x-val"></td>
                    <td><input class="input is-small y-val"></td>
                </tr>
                </tbody>
            </table>

            <div class="file is-warning is-small is-left mt-2">
                <label class="file-label">
                    <input id="dataFile" class="file-input" type="file" name="userData" multiple>
                    <span class="file-cta">
            <span class="file-label">Выбрать файл…</span>
        </span>
                </label>
                <button id="submitButton" class="button is-medium is-info is-right ml-5">
                    Пуск
                </button>
            </div>
        </div>
    </div>

</section>
<section>
    <div id="submitHelper" class="notification is-danger has-text-centered" style="display: none; position: absolute">
        <button id="notificationButton" class="delete"></button>
        <br><b><u>Иксы должны быть уникальными цифрами. </u></b>
        <b><u> Поля должны быть заполнены</u></b></h1>
    </div>
</section>

<section class="section">
    <div class="column">
        <div class="field">
            <label class="label" for="result">Результат:</label>
            <div class="control">
                <textarea id="result" class="textarea" rows="10" cols="10" readonly></textarea>
            </div>
        </div>
    </div>
</section>


<script src="<c:url value="/js/graphic.js"/>"></script>
<script src="<c:url value="/js/table.js"/>"></script>
</body>
</html>


