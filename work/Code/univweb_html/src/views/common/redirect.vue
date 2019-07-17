<script>
export default {
    beforeCreate () {
        // console.log(this.$route)
        this.$store.dispatch('delView', { name: 'redirect', path: this.$route.fullPath }).then(() => {
            this.$nextTick(() => {
                const { params, query } = this.$route
                const { path } = params
                this.$router.replace({ path: '/' + path, query })
            })
        })
    },
    render: function (h) {
        return h() // avoid warning message
    }
}
</script>
