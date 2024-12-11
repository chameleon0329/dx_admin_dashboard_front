<template>
    <nav class="sidebar">
        <div class="logo"><router-link to="/" class="logo">LG Life Station</router-link></div>
        <SelectBox />
        <div>
            <ul>
                <!-- <li><router-link to="/" class="nav-button">MAIN</router-link></li> -->
                <li><router-link to="/mealkit" class="nav-button">밀키트 관리</router-link></li>
                <li><router-link to="/laundrysupplies" class="nav-button">세탁용품 관리</router-link></li>
                <li><router-link to="/user" class="nav-button">고객 관리</router-link></li>
                <li><router-link to="/homeappliance" class="nav-button">가전 관리</router-link></li>
                <li><router-link to="/order" class="nav-button">재고 주문</router-link></li>
                <!-- <li><router-link to="/congestion" class="nav-button">혼잡도</router-link></li> -->
            </ul>
        </div>
    </nav>
</template>

<script>
import SelectBox from './SelectBox.vue';

export default {
    name: 'Sidebar',
    components: {
        SelectBox,
    }

    }
</script>

<style scoped>
/* 사이드바 스타일 */
.sidebar {
    width: 220px;
    height: 1000px;
    background-color: #FF5E23;
    text-align: center;
    padding: 20px;
    position: fixed;
    box-sizing: border-box;
    z-index: 1000;
    border-radius: 10px;
}

.logo {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 40px;
    text-align: center;
    text-decoration: none;
    display: block;
    padding: 10px;
    margin: 10px;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.logo:hover{
    transform: scale(1.1); /* 버튼 크기 확대 */
    background-color: #ededed; /* 배경 색 변경 */
    color: #ff4d4d;
    cursor: pointer;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.nav-button {
    color: #FFD1A7;
    text-decoration: none;
    font-size: 15px;
    display: block;
    padding: 15px;
    margin: 10px 0;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-align: center;
}

/* 기본 버튼 스타일 */
.nav-button:hover {
    transform: scale(1.1); /* 버튼 크기 확대 */
    background-color: #ededed; /* 배경 색 변경 */
    color: #ff4d4d;
    cursor: pointer;
}
</style>
