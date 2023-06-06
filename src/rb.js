// 91rb v1.1
[{
    host: '91rb',
    script: function () {
        let renderList = true;
        hookClick((e) => {
            let $a = e.target;

            function getUrl($a) {
                if (!$a.pathname.startsWith('/video')) return;

                const pathname = $a.pathname
                const isHD = !!$a.querySelector('.is-hd')
                let id = (pathname.match(/\/\d+\//) || [])[0]
                if (id) {
                    id = +id.replace(/\//g, '')
                    const fileName = isHD ? `${id}_${720}p` : id
                    let HOST = Number(id) >= 50000 ? 'cust91rb2.163cdn.net' : 'cust91rb.163cdn.net';
                    HOST = `cdn.163cdn.net/hls/contents`;
                    const url = `https://${HOST}/videos/${Math.floor(id / 1000)}000/${id}/${fileName}.mp4/index.m3u8`
                    return url
                }
            }

            const currentVideoUrl = getUrl($($a).parent('a').selector[0])
            if (currentVideoUrl) {
                e.preventDefault();
                e.stopPropagation();
                const allUrls = Array.from($($a).parent('.list-videos').selector[0].querySelectorAll('.item>a')).map(getUrl).filter(i => i);
                previewVideo(currentVideoUrl, renderList ? allUrls : [currentVideoUrl])
            }
        })

        addStyle(`
            .vip_hulian, .vip_hulian1 { display: none !important; }
        `);
    }
}]
