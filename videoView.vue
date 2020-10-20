<style>
.my-image {
  width: 200px;
  /* max-width: 250px; */
  height: auto;
  /* max-height: 300px; */
}
</style>

<template>
<div>

  <!-- No Lazy Code -->
  <!-- <div v-for="(item, index) in lists" :key="item.id">
    <span>
    <img class="my-image" v-bind:src="item.thumbnailUrl" blank-color="#fff" img-top alt="Image" offset="0"></img>
    <h5> {{item.id}} / {{item.title}}  </h5>
    </span>
  </div> -->

  <!-- v2-lazy-list Code -->
  <!-- <v2-lazy-list :data='lists' :threshold="20" @reach-threshold="logging" :height="0" :item-height="500">
    <template slot-scope="item">
      <span>
        <img class="my-image" v-bind:src="item.thumbnailUrl" blank-color="#fff" img-top alt="Image" offset="0"></img>
        <h5> {{item.id}} / {{item.title}}  </h5>
      </span>
    </template>
  </v2-lazy-list> -->

  <!-- Vue-Lazyload Code Original-->
  <!-- <div v-for="(item, index) in lists" :key="item.id">
    <span>
    <img class="my-image" v-lazy="item.thumbnailUrl" blank-color="#fff" img-top alt="Image" offset="0"></img>
    <h5> {{item.id}} / {{item.title}}  </h5>
    </span>
  </div> -->


  <!-- Vue-Lazyload Code Using -->
  <v-container fluid grid-list-xs text-xs-center align-content-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon @click="toggleView">
            <v-icon>view_module</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
      <!-- <div v-if="view_type==0"> -->
      <v-flex v-if="view_type==0" xs12 sm6 md4 lg2 xl2 align-content-start wrap v-for="(item, index) in lists" :key="index">
        <!-- <div v-for="(item, key, index) in lists"> -->
        <v-card hover height="350px">
          <!-- <v-card-media src="@/assets/loading_50px.gif" height="200px" width="200px"> -->
          <!-- <v-card-media v-lazy="item.thumbnailUrl" height="200px" width="200px"> -->

          <!-- <v-card-media src="./assets/error.png" height="150px"> -->
          <v-card-media :src="item.thumbnailUrl" height="150px" width="150px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{item.title}}</h3>
              <div>Id : {{item.id}}, Album: {{item.albumId}}
                <br>URL : {{item.url}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
        <!-- </div> -->
      </v-flex>
      <!-- </div> -->
      <v-flex v-if="view_type==1" xs12 align-content-center wrap>
        <v-card width="600px">
          <!-- <v-list v-if="view_type==1" two-line subheader> -->
          <v-list three-line subheader>

            <v-subheader inset>Video</v-subheader>
            <template v-for="(item, index) in lists">
                            <v-list-tile avatar :key="index" @click="">
                                <v-list-tile-avatar>
                                    <img :src="item.thumbnailUrl">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        Id : {{item.id}}, Album: {{item.albumId}}
                                        <br> URL : {{item.url}}
                                    </v-list-tile-sub-title>

                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-btn icon ripple>
                                        <v-icon color="grey lighten-1">info</v-icon>
                                    </v-btn>
                                </v-list-tile-action>

                            </v-list-tile>
                        </template>
          </v-list>
          <v-divider inset></v-divider>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>


</div>
</template>

<script>
export default {


  mounted() {
    this.$store.dispatch('inspectToken', {
      // id: this.$store.state.id,
      // password: this.$store.state.password
    })
    // console.log(this.$store.state.baseURI);
    // this.$http.get(this.$store.state.baseURI + "/ams/1.0/items/0/0/0/1/all/0/0")
    // this.$http.get(this.$store.state.baseURI + "/ams/1.0/unused/items/1")
    this.$http.get("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        this.lists = response.data.slice(0, 20);
        // this.lists = response.data;
      });
  },
  data() {
    return {
      lists: [],
      view_type: 0 //0:tile, 1:list
    };
  },
  methods: {
    toggleView: function() {
      if (this.view_type == 0) this.view_type = 1;
      else this.view_type = 0;
      console.log(this.view_type);
      return this.view_type;
    },
    getImage: function(id) {

    },
    logging: function() {
      console.log('threshold reached')
    },
    handler(component) {
      console.log('this component is showing')
    }
  },
  components: {

  }
};
</script>
