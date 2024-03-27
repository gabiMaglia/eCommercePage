"use client"

import {Images as ImageType} from '@/types'
import {Tab} from '@headlessui/react'

import Image from 'next/image'
import GalleryTab from './gallery-tab'

interface GalleryProps {
    images: ImageType[]
}

const Galery: React.FC<GalleryProps> = (
    {images}
) => {
    return ( 
        <Tab.Group as="div" className="flex flex-col-reverse">
            <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
                <Tab.List className="grid grid-cols-4 gap-6">
                    {images.map((images) => (
                        <GalleryTab key={images.id} image={image} />
                    ))}
                </Tab.List>
            </div>
        </Tab.Group>
     );
}
 
export default Galery;