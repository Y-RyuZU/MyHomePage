<script setup lang="ts">
</script>

<template>
    <div>
        <nav>
            <ul>
                <li><a href="/">HOME</a></li>
                <li>
                    <RouterLink to="/test-animation">test-animation</RouterLink>
                </li>
                <li>
                    <RouterLink to="/load-excel">エクセルロード</RouterLink>
                </li>
                <li><a href="#">ブログ</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
ul {
    display: flex;
}

li {
    list-style: none;
}

a {
    display: block;
    text-decoration: none;
    color: white;
    margin-right: 35px;
}

nav {
    padding-top: 5px;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    background-color: dimgray;
}
</style>
