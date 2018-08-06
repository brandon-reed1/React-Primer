import React from 'react'
import PropTypes from 'prop-types'
import {fontFamily} from 'styled-system'
import {render} from '../utils/testing'
import {withSystemProps} from '../system-props'

describe('system props', () => {
  describe('withSystemProps()', () => {
    xit('merges all the propTypes', () => {
      const Component = () => <b />
      const Wrapped = withSystemProps(Component, ['fontFamily'])
      expect(Wrapped.propTypes).toEqual(fontFamily.propTypes)
    })

    it('renders the underlying component', () => {
      const Component = jest.fn(props => <b {...props} />)
      Component.propTypes = {
        foo: PropTypes.number
      }
      const Wrapped = withSystemProps(Component, ['fontFamily'])
      expect(render(<Wrapped />).type).toEqual('b')
    })

    it('sets systemComponent = true', () => {
      expect(withSystemProps('div').systemComponent).toEqual(true)
      expect(withSystemProps({is: 'div'}).systemComponent).toEqual(true)
    })

    const theme = {
      space: [0, '8px', '16px'],
      fonts: {
        sans: 'Helvetica,Verdana,sans-serif'
      }
    }

    it('applies one theme value', () => {
      const Component = jest.fn(props => <b {...props} />)
      const Wrapped = withSystemProps(Component, ['space'])
      const result = render(<Wrapped m={2} theme={theme} />)
      expect(Component.mock.calls).toHaveLength(1)
      expect(result).toMatchSnapshot()
      expect(result).toHaveStyleRule('margin', theme.space[2])
    })

    it('applies multiple theme values', () => {
      const Component = props => <b {...props} />
      const Wrapped = withSystemProps(Component, ['fontFamily', 'space'])
      const result = render(<Wrapped fontFamily="sans" m={2} theme={theme} />)
      expect(result).toMatchSnapshot()
      expect(result).toHaveStyleRule('font-family', theme.fonts.sans)
      expect(result).toHaveStyleRule('margin', theme.space[2])
    })
  })
})
