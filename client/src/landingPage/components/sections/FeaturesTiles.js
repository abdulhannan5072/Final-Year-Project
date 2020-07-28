import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Software Maintenance ',
    paragraph: ' We  handle the maintenance of software to ensure that your software is bug-free at deployment. We follow the best application software maintenance practices to make your software robust and secure. Our software support services include '
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
               
                    <Image
                      src={require('./../../assets/images/performance-improvement.png')}
                      alt="Features tile icon 01"
                      width={64}
                      height={64} />
                  
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Performance Improvement
                    </h4>
                  <p className="m-0 text-sm">
                  Application software maintenance programs usually include upgrades and allow users to enjoy the upgrades for free for a whole year. Upgrades enhance the overall functionality and performance of the software and increase its lifecycle as well
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                
                    <Image
                      src={require('./../../assets/images/bug-fixing.png')}
                      alt="Features tile icon 02"
                      width={64}
                      height={64} />
               
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Bug Fixing 
                    </h4>
                  <p className="m-0 text-sm">
                  Application software maintenance packages help protect the software from software problems but are usually meant for a specific time period. After the expiry of the warranty period, you need to pay for the bug fixes yourself. A maintenance plan will, however, take care of that.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                 
                    <Image
                      src={require('./../../assets/images/stay-updated-with-current-trends.png')}
                      alt="Features tile icon 03"
                      width={64}
                      height={64} />
                  
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Stay Updated
                    </h4>
                  <p className="m-0 text-sm">
                  Technology and tech-dependent businesses go through tremendous change frequently. To stay abreast of trending technologies, it is critical that you update your software applications regularly. 
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  
                    <Image
                      src={require('./../../assets/images/cut-costs.png')}
                      alt="Features tile icon 04"
                      width={64}
                      height={64} />
                 
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Cut Costs
                    </h4>
                  <p className="m-0 text-sm">
                  With the maintenance of software services, you can keep a tab on your software expenditure. Most programs cover users for a year's period, thereby reducing an organization's investment for IT greatly. When you use cloud-based apps, the monthly charges you pay for those services usually include the maintenance fees as well.
                    </p>
                </div>
              </div>
            </div>
            
         
         

           

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;