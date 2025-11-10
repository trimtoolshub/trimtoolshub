import AdSlot from './AdSlot'

const ArticleAd = ({ position = 'inline', style = {} }) => {
  const adStyles = {
    inline: {
      margin: '2rem 0',
      textAlign: 'center',
      padding: '1rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '0.5rem',
      border: '1px solid var(--border)'
    },
    sidebar: {
      margin: '1.5rem 0',
      textAlign: 'center'
    },
    banner: {
      margin: '2rem 0',
      textAlign: 'center',
      padding: '1rem',
      backgroundColor: 'var(--bg-card)',
      borderRadius: '0.75rem',
      border: '1px solid var(--border)'
    }
  }

  const getSlotId = () => {
    switch (position) {
      case 'inline':
        return 'article-inline-ad'
      case 'sidebar':
        return 'article-sidebar-ad'
      case 'banner':
        return 'article-banner-ad'
      default:
        return 'article-ad'
    }
  }

  const getAdSize = () => {
    switch (position) {
      case 'sidebar':
        return 'rectangle'
      case 'banner':
        return 'banner'
      default:
        return 'leaderboard'
    }
  }

  return (
    <div style={{ ...adStyles[position], ...style }}>
      <AdSlot 
        slotId={getSlotId()} 
        size={getAdSize()}
        style={{ margin: '0 auto' }}
      />
    </div>
  )
}

export default ArticleAd
