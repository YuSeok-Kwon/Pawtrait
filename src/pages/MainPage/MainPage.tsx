import {
  HeroSection,
  ExampleSection,
  GuideSection,
  PricingSection,
} from './Components';

export default function MainPage() {
  return (
    <>
      <HeroSection />
      <div id="example-section">
        <ExampleSection />
      </div>
      <div id="guide-section">
        <GuideSection />
      </div>
      <div id="pricing-section">
        <PricingSection />
      </div>
    </>
  );
}
