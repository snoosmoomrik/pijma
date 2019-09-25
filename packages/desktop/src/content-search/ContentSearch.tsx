import React, {FunctionComponent, RefObject, createRef} from 'react'

import {
  SuggestControl,
  Image,
  MenuControl,
  Card,
  Icon,
  Flex,
  FlexItem,
  Spinner,
  ContentInput,
  Spacer,
  Pos,
  Box,
} from '@qiwi/pijma-core'
import {DropDown} from '../drop-down'
import {Text} from '../typography'

import ContentSearchProps from './ContentSearchProps'
import SearchItem from './SearchItem'

const CardPos = Card.withComponent(Pos)

const dropDownContainerRef: RefObject<HTMLDivElement> = createRef()

export const ContentSearch: FunctionComponent<ContentSearchProps> = (props) => (
  <SuggestControl<SearchItem>
    show={props.show}
    items={props.items}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    onShow={props.onShow}
    onHide={props.onHide}
    onSubmit={props.onSubmit}
    children={(renderProps) => (
      <MenuControl<SearchItem>
        items={props.items}
        onItemSelect={props.onItemSelect}
        onSubmit={renderProps.onSubmit}
        children={(menuRenderProps) => (
          <Pos type="relative" ref={dropDownContainerRef} width={1}>
            <Box
              width={1}
              onMouseEnter={renderProps.onMouseEnter}
              onMouseLeave={renderProps.onMouseLeave}
            >
              <ContentInput
                value={props.value}
                ref={renderProps.inputRef}
                type="search"
                pr={14}
                error={false}
                focused={renderProps.focused}
                expanded={renderProps.show}
                hovered={renderProps.hovered}
                onChange={renderProps.onChange}
                onFocus={renderProps.onFocus}
                onBlur={renderProps.onBlur}
                onKeyDown={menuRenderProps.onKeyDown}
              />
              <Pos
                type="absolute"
                cursor="pointer"
                right={4}
                top={3}
                onClick={renderProps.onSubmit}
                children={props.loading ? (
                  <Spinner color="#ff8c00" width={6} height={6}/>
                ) : (
                  <Icon name="search" color="#666"/>
                )}
              />
            </Box>
            <DropDown
              show={renderProps.show}
              rootClose={false}
              container={dropDownContainerRef.current}
              target={renderProps.inputRef.current!}
              onHide={() => renderProps.onHide()}
            >
              <CardPos
                minWidth={1}
                maxHeight={110}
                bg="#fff"
                r="0 0 10px 10px"
                s="0 20px 64px 0 rgba(0, 0, 0, 0.16)"
                bt="solid 1px #e6e6e6"
                ref={menuRenderProps.containerRef}
                overflow="auto"
                height={1}
                type="relative"
                pt={3}
              >
                {menuRenderProps.items.map((item, key) => (
                  <Card
                    key={key}
                    ref={item.ref}
                    px={4}
                    py={2}
                    cursor="pointer"
                    bg={item.selected ? '#E6E6E6' : item.focused ? '#F5F5F5' : '#FFF'}
                    onClick={item.onClick}
                    onMouseEnter={item.onMouseEnter}
                    onMouseLeave={item.onMouseLeave}
                  >
                    <Flex>
                      <FlexItem shrink={0} mr={3}>
                        <Image width={6} height={6} src={item.logo}/>
                      </FlexItem>
                      <FlexItem grow={1}>
                        <Spacer size="xxs">
                          <Text bold>{item.title}</Text>
                          <Text color="support">{item.description}</Text>
                        </Spacer>
                      </FlexItem>
                    </Flex>
                  </Card>
                ))}
                {props.result ? (
                  <Box px={4} py={2}>
                    {props.result}
                  </Box>
                ) : (
                  null
                )}
              </CardPos>
            </DropDown>
          </Pos>
        )}
      />
    )}
  />
)
