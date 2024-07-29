<script setup>
import { VPTeamMembers } from 'vitepress/theme';

const members = [
  {
    avatar: '/public/github_avatar.png',
    name: 'ZGH1949',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/zgh1949' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/62081873' }
    ]
  },
]
</script>

# ABOUT


<VPTeamMembers size="small" :members="members" />

他目前很神秘👨🏻
