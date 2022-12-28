import os
import setuptools

setuptools.setup(
    name="vule_ipython",
    version="1.0.0",
    author="Le Tuan Vu",
    author_email="ltnv24@gmail.com",
    description="Vu's custom magic commands",
    long_description="",
    long_description_content_type="text/markdown",
    packages=['vule_sparkmagic'],
    install_requires=['ipython'],
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.7',
)