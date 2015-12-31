<?php
    $frag = $_GET['_escaped_fragment_'];
    if ($frag) {
        $url = "/cache/".str_replace("/", "_", $frag).".html";
        header("Location: ".$url);
    } else {
        header("Location: index.html");
    }
?>