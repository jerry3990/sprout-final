import Navbar from '../components/navbar'
import HeroSection, { HERO_VIDEOS } from '../components/HeroSection'
import VideoOverlaySection from '../components/VideoOverlaySection'
import StayInspiredSection from '../components/StayInspiredSection'
import SiteFooter from '../components/SiteFooter'

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          id="how-it-works-hero"
          titleLine1="HOW IT WORKS"
          titleLine2="WITH THE SPROUT"
          ctaText="Start the Conversation"
          ctaHref="/contact"
          videoSrc={HERO_VIDEOS[2]}
        />
        <VideoOverlaySection videoSrc={HERO_VIDEOS[1]} side="right">
          {/* Content for right-side card */}
        </VideoOverlaySection>
        <VideoOverlaySection videoSrc={HERO_VIDEOS[0]} side="left">
          {/* Content for left-side card */}
        </VideoOverlaySection>
        <StayInspiredSection />
        <SiteFooter />
      </main>
    </>
  )
}

