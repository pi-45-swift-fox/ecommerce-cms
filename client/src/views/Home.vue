<template>
  <div class="home bg-black">
    <div class="container">
      <h1>WELCOME TO E-COMMERCE CMS APP</h1>
      <br><br>
      <p>
        A content management system (CMS) is a software application that can be used to manage the creation and modification of digital content. CMSs are typically used for enterprise content management (ECM) and web content management (WCM). ECM typically supports multiple users in a collaborative environment by integrating document management, digital asset management and record retention. Alternatively, WCM is the collaborative authoring for websites and may include text and embed graphics, photos, video, audio, maps and program code that display content and interact with the user. ECM typically includes a WCM function.
      </p>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 95vw;
  color: #c0ccd4;
  font-family: 'Cardo', serif;
}

h1 {
  color:#ffce00;
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
  cursor: pointer;
}

h1:hover {
  -ms-transform: skewY(10deg); /* IE 9 */
  transform: skewY(10deg);
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
}

.bg-black {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 95vw;
  color: #c0ccd4;
  font-family: 'Cardo', serif;
}

</style>
